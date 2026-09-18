import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from 'antd';
import { themeConfig } from './theme';

export function ThemeProvider({ children }) {
  return (
    <ConfigProvider theme={themeConfig} direction={themeConfig.direction || 'ltr'}>
      {children}
    </ConfigProvider>
  );
}