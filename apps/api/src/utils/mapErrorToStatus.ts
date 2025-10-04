
export function mapErrorToStatus(code: string): number {
  switch (code) {
  
  // Regras de negocio
    case "INVALID_INPUT": 
      return 400;
  

    case "EMAIL_CONFLICT":
    case "USERNAME_CONFLICT":
    case "PHONE_CONFLICT": 
    case "USER_ALREADY_EXISTS": 
      return 409;
    
  //Autorização
    case "FORBIDDEN": 
      return 403;
    case "UNAUTHORIZED": 
      return 401;
    
    // Genericos
    case "INTERNAL_ERROR": 
      return 500;
    case "NOT_FOUND": 
      return 404;

    default: return 400;
  }
}




