import { IPagination, LanguageType } from './common';

export const userRoles: { [index: string]: string } = {
  root: `root`,
  admin: `admin`,
  billing: `billing`,
  user: `user`,
};

export interface IUserBase {
  organization_id?: string;
  default_project_id?: string;
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  phone?: string;

  active?: boolean;
  roles?: string[];
  language: LanguageType;
  validated?: boolean;
  created?: Date;

  guide?: IGuide;

  public_key?: string;
  private_key?: string;
}

export interface IAcquisitionStats {
  total_users: number;
  validated: number;
  with_optimization: number;
  with_plans: number;
  register_stats: Array<{ date: string; value: number }>;
}
interface IGuide {
  changelog_version?: string;
  tutorials?: {
    onboarding?: {
      is_finished: boolean;
      current_step: number;
    };
  };
}

export interface IUserData extends IUserBase {
  id: string;
  deleted: boolean;
}

export interface IAdministrationUserExtended extends IUserData {
  _id: string;
}

export type IAdministrationUsersPagination = IPagination<IAdministrationUserExtended>;
