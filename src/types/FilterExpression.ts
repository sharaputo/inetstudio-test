export interface FilterExpression {
  key: "country" | "score";
  operation: "greater_than" | "less_than" | "contains";
  value: string | number;
}
