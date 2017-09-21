import * as React from 'react';
import { Input } from './Input';

export const DisabledInput = ({ value }: { value: string }) =>
  <Input
    color="#6f6f6f"
    backgroundColor="#f4f4f4"
    disabled
    value={value}
  />;