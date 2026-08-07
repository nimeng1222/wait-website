import { CodeBlock } from '@/components/CodeBlock'
import { Code, DocH1, DocH2, DocLead, DocNote, DocOl, DocP, DocTable } from '@/components/doc'

export function ConfigRef() {
  return (
    <div>
      <DocH1>配置参考</DocH1>
      <DocLead>
        wait-monitor 通过环境变量进行配置。脚本安装可在 systemd 单元中调整，Docker
        部署通过 <Code>-e</Code> 传入。
      </DocLead>

      <DocH2>环境变量</DocH2>
      <DocTable
        head={['变量', '默认值', '说明']}
        rows={[
          [
            <Code key="1">WAIT_LISTEN</Code>,
            <Code key="1d">0.0.0.0:25774</Code>,
            'HTTP 服务监听地址，修改端口在此配置',
          ],
          [
            <Code key="2">WAIT_CORS_ALLOWLIST</Code>,
            '空（拒绝所有跨域）',
            '跨域来源白名单，逗号分隔；未设置时拒绝一切跨域请求',
          ],
          [
            <Code key="3">WAIT_WS_DISABLE_ORIGIN</Code>,
            '关闭',
            '调试用：禁用 WebSocket Origin 校验，生产环境不要开启',
          ],
          [
            <Code key="4">WAIT_ENABLE_CLOUDFLARED</Code>,
            '关闭',
            '启用内嵌 Cloudflare Tunnel，无公网 IP 时访问面板',
          ],
          [
            <Code key="5">WAIT_CLOUDFLARED_TOKEN</Code>,
            '空',
            'Cloudflare Tunnel 的 token，配合上一项使用',
          ],
          [
            <Code key="6">WAIT_MAIN_RELEASE_VERSION</Code>,
            '最新版',
            '安装脚本使用：固定安装 / 升级到指定版本（如 vX.Y.Z）',
          ],
          [
            <Code key="7">GOMEMLIMIT</Code>,
            <Code key="7d">400MiB</Code>,
            'Go 运行时内存上限（Docker 镜像默认值）',
          ],
          [
            <Code key="8">GOGC</Code>,
            <Code key="8d">200</Code>,
            'Go GC 目标百分比（Docker 镜像默认值）',
          ],
        ]}
      />

      <DocH2>端口与目录速查</DocH2>
      <DocTable
        head={['项目', '值']}
        rows={[
          ['默认端口', <Code key="1">25774</Code>],
          ['安装目录', <Code key="2">/opt/wait-monitor</Code>],
          ['数据目录', <Code key="3">/opt/wait-monitor/data</Code>],
          [
            '初始凭据文件',
            <Code key="4">/opt/wait-monitor/data/initial-admin-credentials.json</Code>,
          ],
          ['Agent 环境文件', <Code key="5">/opt/wait/wait-agent.env</Code>],
        ]}
      />

      <DocH2>通过 Cloudflare Tunnel 访问（无公网 IP）</DocH2>
      <DocP>服务器没有公网 IP 时，可以使用内嵌的 cloudflared，无需单独安装：</DocP>
      <DocOl>
        <li>在 Cloudflare Zero Trust 控制台创建 Tunnel，复制 token；</li>
        <li>
          配置环境变量 <Code>WAIT_ENABLE_CLOUDFLARED=1</Code> 与{' '}
          <Code>WAIT_CLOUDFLARED_TOKEN=&lt;你的token&gt;</Code>；
        </li>
        <li>重启服务，通过 Cloudflare 分配的域名访问面板。</li>
      </DocOl>
      <CodeBlock
        code={'WAIT_ENABLE_CLOUDFLARED=1\nWAIT_CLOUDFLARED_TOKEN=<你的token>'}
        title="环境变量示例"
      />

      <DocH2>跨域（CORS）说明</DocH2>
      <DocP>
        默认未设置 <Code>WAIT_CORS_ALLOWLIST</Code> 时，服务端拒绝所有跨域请求——这是安全默认值，
        不是故障。需要跨域访问（例如独立部署前端）时，将允许的来源逐条写入，逗号分隔：
      </DocP>
      <CodeBlock
        code={'WAIT_CORS_ALLOWLIST="https://console.example.com,https://admin.example.com"'}
        title="环境变量示例"
      />
      <DocNote>
        WebSocket 默认校验 Origin。仅在调试时可设置 <Code>WAIT_WS_DISABLE_ORIGIN</Code>{' '}
        禁用该校验，问题解决后应立即移除。
      </DocNote>
    </div>
  )
}
