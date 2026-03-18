import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import IndexV2 from "./pages/IndexV2.tsx";
import IndexV3 from "./pages/IndexV3.tsx";
import IndexV4 from "./pages/IndexV4.tsx";
import IndexV5 from "./pages/IndexV5.tsx";
...
          <Route path="/v4" element={<IndexV4 />} />
          <Route path="/v5" element={<IndexV5 />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:slug" element={<ProductListing />} />
          <Route path="/bundle/:id" element={<BundleBuilder />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
