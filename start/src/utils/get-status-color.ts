export function getStatusColor(status: number) {
  if (status >= 200 && status < 300) return 'bg-[#BDE693]';
  if (status >= 300 && status < 400) return 'text-blue-400';
  if (status >= 400 && status < 500) return 'text-yellow-400';
  return 'text-red-400';
}
