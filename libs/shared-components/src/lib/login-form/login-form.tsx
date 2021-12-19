import { LockClosedIcon } from '@heroicons/react/solid';
import { useFormik } from 'formik';
import { LoginSchema } from './login-schema';

interface LoginFormProps {
  title?: string;
  isLoading?: boolean;
  onLogin: (data: { email: string; password: string }) => void;
}
export function LoginForm({ isLoading, onLogin, title }: LoginFormProps) {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) =>
      onLogin({ email: values.email, password: values.password }),
  });

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white max-w-md px-6 rounded shadow-md space-y-8 w-full mt-24">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
            {title}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md -space-y-px">
            <div className="mb-4">
              <label className="sr-only">Email address</label>
              <input
                name="email"
                type="text"
                className="text-gray-900 ring-gray-900 ring-opacity-5 placeholder-gray-400 appearance-none bg-white rounded-md block w-full px-3 py-2 border border-transparent shadow ring-1 sm:text-sm focus:border-teal-500 focus:ring-teal-500 focus:outline-none"
                placeholder="Email address"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-red-500 text-sm">Email is required</p>
              )}
            </div>
            <div className="mb-6">
              <label className="sr-only">Password</label>
              <input
                name="password"
                type="password"
                className="text-gray-900 ring-gray-900 ring-opacity-5 placeholder-gray-400 appearance-none bg-white rounded-md block w-full px-3 py-2 border border-transparent shadow ring-1 sm:text-sm  focus:border-teal-500 focus:ring-teal-500 focus:outline-none"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="mt-1 text-red-500 text-sm">
                  Password is required
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative block w-full py-2 px-3 border border-transparent rounded-md text-white font-medium bg-gray-700 shadow-sm sm:text-sm mb-10 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-teal-500 group-hover:text-teal-400"
                  aria-hidden="true"
                />
              </span>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
