export function timestampToDate(timestamp: string){
    return new Date(Number(timestamp)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
  }

export function getErrorMessage(error: any) {
    // Check if the error has graphQLErrors
    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      return error.graphQLErrors.map((err:any) => err.message).join(', ');
    }
  
    // Check if the error has networkError and it contains result with errors
    if (error.networkError && error.networkError.result && error.networkError.result.errors) {
      return error.networkError.result.errors.map((err:any) => err.message).join(', ');
    }
  
    // Check for clientErrors
    if (error.clientErrors && error.clientErrors.length > 0) {
      return error.clientErrors.map((err:any) => err.message).join(', ');
    }
  
    // Default error message
    return 'An unknown error occurred';
  }