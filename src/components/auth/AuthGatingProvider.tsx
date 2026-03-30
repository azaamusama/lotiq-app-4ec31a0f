import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from "react";

type UserState = "new" | "returning" | "unactivated" | "logged_in";
type ModalVariant = "new_user" | "returning_user" | "unactivated" | null;
type TriggerReason = "time" | "product_views" | "add_to_cart" | "exit_intent" | "hard_gate" | null;

interface AuthGatingContextType {
  userState: UserState;
  modalVariant: ModalVariant;
  triggerReason: TriggerReason;
  isModalOpen: boolean;
  openModal: (variant: ModalVariant, reason?: TriggerReason) => void;
  closeModal: () => void;
  dismissCount: number;
  trackProductView: () => void;
  trackAddToCart: () => void;
  isAuthenticated: boolean;
  setAuthenticated: (v: boolean) => void;
  productViewCount: number;
}

const AuthGatingContext = createContext<AuthGatingContextType | null>(null);

export const useAuthGating = () => {
  const ctx = useContext(AuthGatingContext);
  if (!ctx) throw new Error("useAuthGating must be used within AuthGatingProvider");
  return ctx;
};

export const AuthGatingProvider = ({ children }: { children: ReactNode }) => {
  const [userState, setUserState] = useState<UserState>("new");
  const [modalVariant, setModalVariant] = useState<ModalVariant>(null);
  const [triggerReason, setTriggerReason] = useState<TriggerReason>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dismissCount, setDismissCount] = useState(0);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [productViewCount, setProductViewCount] = useState(0);
  const hasTriggered = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // Detect returning visitor
  useEffect(() => {
    const visited = localStorage.getItem("safco_visited");
    const hasAccount = localStorage.getItem("safco_has_account");
    const activated = localStorage.getItem("safco_activated");

    if (hasAccount && !activated) {
      setUserState("unactivated");
    } else if (visited) {
      setUserState("returning");
    } else {
      setUserState("new");
      localStorage.setItem("safco_visited", "true");
    }
  }, []);

  const openModal = useCallback((variant: ModalVariant, reason: TriggerReason = null) => {
    if (isAuthenticated) return;
    setModalVariant(variant);
    setTriggerReason(reason);
    setIsModalOpen(true);
  }, [isAuthenticated]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setDismissCount((c) => c + 1);
  }, []);

  const getVariantForState = useCallback((): ModalVariant => {
    if (userState === "unactivated") return "unactivated";
    if (userState === "returning") return "returning_user";
    return "new_user";
  }, [userState]);

  // Time-based trigger (20s)
  useEffect(() => {
    if (isAuthenticated || hasTriggered.current) return;
    timerRef.current = setTimeout(() => {
      if (!hasTriggered.current && !isAuthenticated) {
        hasTriggered.current = true;
        openModal(getVariantForState(), "time");
      }
    }, 20000);
    return () => clearTimeout(timerRef.current);
  }, [isAuthenticated, openModal, getVariantForState]);

  // Exit intent trigger
  useEffect(() => {
    if (isAuthenticated) return;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered.current && !isAuthenticated) {
        hasTriggered.current = true;
        openModal(getVariantForState(), "exit_intent");
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [isAuthenticated, openModal, getVariantForState]);

  const trackProductView = useCallback(() => {
    if (isAuthenticated || hasTriggered.current) return;
    setProductViewCount((prev) => {
      const next = prev + 1;
      if (next >= 2 && !hasTriggered.current) {
        hasTriggered.current = true;
        setTimeout(() => openModal(getVariantForState(), "product_views"), 500);
      }
      return next;
    });
  }, [isAuthenticated, openModal, getVariantForState]);

  const trackAddToCart = useCallback(() => {
    if (isAuthenticated) {
      return; // allow add to cart
    }
    // Hard gate after 1 dismiss, soft gate first time
    if (dismissCount >= 1) {
      openModal(getVariantForState(), "hard_gate");
    } else {
      openModal(getVariantForState(), "add_to_cart");
    }
  }, [isAuthenticated, dismissCount, openModal, getVariantForState]);

  return (
    <AuthGatingContext.Provider
      value={{
        userState,
        modalVariant,
        triggerReason,
        isModalOpen,
        openModal,
        closeModal,
        dismissCount,
        trackProductView,
        trackAddToCart,
        isAuthenticated,
        setAuthenticated,
        productViewCount,
      }}
    >
      {children}
    </AuthGatingContext.Provider>
  );
};
