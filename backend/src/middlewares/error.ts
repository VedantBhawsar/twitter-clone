import { Application } from "express";

export async function ErrorHandler(myfun: Function) {
  return Promise.resolve(myfun()).catch((error: any) => {
    console.log(error.error.message);
  });
}
