import { HeaderCompoment, SiderComponent } from "@/components";
import { Layout } from "antd";
import type { AppProps } from "next/app";

const { Content, Sider, Header } = Layout;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <HeaderCompoment />
      <Layout>
        <SiderComponent />
        <Content>
          <div className="container-fuild bg-white">
            <div className="container p-4">
              <Component {...pageProps} />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
