import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left – Brand / Illustration */}
      <section className="hidden md:flex flex-col justify-center items-center bg-linear-to-br from-indigo-600 to-purple-600 text-white p-10">
        <h1 className="text-4xl font-bold mb-4">JobBoard</h1>
        <p className="text-lg opacity-90 text-center max-w-sm">
          Hire smarter. Apply faster. Build your career with confidence.
        </p>
      </section>

      {/* Right – Auth Forms */}
      <section className="flex justify-center items-center p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
