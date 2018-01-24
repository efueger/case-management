export = RelationshipService;
declare class RelationshipService {
  static fetch(): Promise<RelationshipService.Address[]>;
}
declare namespace RelationshipService {
  export interface Relationship {
    /**
     * RELATIONSHIP.ID. String of size 10.
     */
    relationship_id?: string;
    /**
     * RELATIONSHIP.Client ID. String of size 10
     */
    client_id?: string;
    /**
     * RELATIONSHIP.Related Client ID. String of size 10 ,
     */
    related_client_id?: string;
    /**
     * RELATIONSHIP.SYS_ID number designated for each type of relationship between two CLIENTs (e.g., Son/Father, Daughter/Father, Sister/Brother, etc.).Additional info can be reached from system-codes resource by 'CLNTRELC' key. Numeric.
     */
    relationship_type_code?: integer;
    /**
     * RELATIONSHIP.Indicates if the parent client is absent for the related child client. Boolean.
     */
    absent_parent_indicator?: boolean;
    /**
     * RELATIONSHIP.The date the relationship began.
     */
    relationship_start_date?: string;
    /**
     * RELATIONSHIP.The date the relationship ended.
     */
    relationship_end_date?: string;
    /**
     * RELATIONSHIP.Indicates whether the two CLIENTs live in the same home, permitted values are : 'NO', 'UNKNOWN', 'YES'.
     */
    same_home_status?: string;
    /**
     * RELATIONSHIP.Related Client
     */
    related_client?: ClientDTO;
  }
}
