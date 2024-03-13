export interface IGuardMetadata {
  accOwner: {
    checkAccOwner: boolean;
    allowAnyRole: boolean;
    accOwnerRoles: string[];
  };
  roles: string[];
}
