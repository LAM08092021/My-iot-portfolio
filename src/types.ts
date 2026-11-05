export interface BOMItem {
  id: string;
  name: string;
  spec?: string;
  quantity: number;
  unitPrice: number; // VND
  totalPrice: number; // VND
  pinConnection?: string;
  category: 'mcu' | 'sensor' | 'display' | 'actuator' | 'passive' | 'power' | 'other';
  note?: string;
}

export interface PinoutItem {
  id: string;
  component: string;
  componentPin: string;
  mcuPin: string;
  protocol: 'I2C' | 'SPI' | 'UART' | 'ADC' | 'GPIO' | 'PWM' | 'POWER';
  voltage: '3.3V' | '5V' | 'GND';
  description: string;
}

export interface CodeFile {
  filename: string;
  language: 'cpp' | 'c' | 'python' | 'json' | 'markdown';
  description: string;
  content: string;
}

export interface IoTProject {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  category: 'Environment' | 'Smart Home' | 'Agriculture' | 'Industrial' | 'Health & Wearable';
  mcu: string; // e.g. ESP32 NodeMCU-32S
  status: 'Completed' | 'In Progress' | 'Prototype';
  completionDate: string;
  thumbnailUrl?: string;
  description: string;
  highlights: string[];
  features: string[];
  bom: BOMItem[];
  pinouts: PinoutItem[];
  codeFiles: CodeFile[];
  githubUrl?: string;
  simulationConfig?: {
    hasOled: boolean;
    hasBuzzer: boolean;
    hasLeds: boolean;
    sensors: {
      id: string;
      label: string;
      unit: string;
      min: number;
      max: number;
      defaultVal: number;
      warningThreshold: number;
      dangerThreshold: number;
    }[];
  };
}
