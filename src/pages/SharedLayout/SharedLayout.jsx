import Header from "../../widgets/Header/Header";
import AnimatedRoutes from "../../app/routes/AnimatedRouter";

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const SharedLayout = () => {
  return (
    <div className="layout-wrapper">
      <Header />
      <main style={{ flex: 1 }}>
        <AnimatedRoutes />
      </main>
    </div>
  );
};

export default SharedLayout;
