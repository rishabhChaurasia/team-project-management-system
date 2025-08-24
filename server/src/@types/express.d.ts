declare global {
  namespace Express {
    interface User {
      currentWorkspace?: string;
    }
  }
}

export {};