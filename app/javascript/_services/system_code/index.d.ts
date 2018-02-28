export = SystemCodeService;
declare class SystemCodeService {
  static fetch(): Promise<SystemCodeService.SystemCode[]>;
}

declare namespace SystemCodeService {
  export interface SystemCode {
    system_id?: number;
    meta_code?: string;
    category_id?: number;
    logical_id?: string;
    third_id?: string;
    other_code?: string;
    inactive_indicator?: boolean;
    short_description?: string;
    long_description?: string;
  }
}
