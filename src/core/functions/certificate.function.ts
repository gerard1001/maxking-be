export const generateCertificateId = (): string => {
  const dateNumber = new Date().getTime();
  return `MKI-${dateNumber}`;
};
