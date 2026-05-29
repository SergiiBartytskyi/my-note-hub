export const getStatusMessage = (status: number): string => {
  const messages: Record<number, string> = {
    409: 'User with this email already exists',
    400: 'Invalid request data',
    401: 'Unauthorized',
    403: 'Access denied',
    404: 'Not found',
    500: 'Server error, please try again later',
  };
  return messages[status] ?? 'Something went wrong';
};
