import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export type BaseFormState = {
  message: string;
  errors?: Record<string, string[] | undefined>;
};

type FormAction<T extends BaseFormState> = (
  prevState: T,
  formData: FormData
) => Promise<T>;

/**
 * Wraps a form action with authentication and authorization logic.
 *
 * The `authFormAction` function takes a form action (an async function handling form submission)
 * and returns a new function that first checks if the current user is authenticated.
 *
 * This ensures that only users with the "org:admin" role can perform the wrapped form actions.
 *
 * @param action - The form action to wrap, which receives the previous state and form data.
 * @returns A new form action with authentication and authorization checks.
 */
export function authFormAction<T extends BaseFormState>(action: FormAction<T>) {
  return async (prevState: T, formData: FormData): Promise<T> => {
    const { orgRole } = await auth();

    if (!orgRole || orgRole !== "org:admin") {
      redirect("/products");
    }

    return action(prevState, formData);
  };
}

/**
 * Wraps a action with authentication and authorization logic.
 *
 * The `authAction` function takes args
 * and returns a new function that first checks if the current user is authenticated.
 *
 * @param action - The form action to wrap, which receives the previous state and form data.
 * @returns A new form action with authentication and authorization checks.
 */
export function authAction<T extends (...args: any[]) => any>(
  action: T
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const { orgRole } = await auth();

    if (!orgRole || orgRole !== "org:admin") {
      redirect("/products");
    }

    return action(...args);
  };
}
