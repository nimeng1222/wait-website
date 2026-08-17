import { CodeBlock } from '@/components/CodeBlock'
import { Code, DocH1, DocH2, DocLead, DocNote, DocOl, DocP, DocTable, DocUl } from '@/components/doc'

const AGENT_CMD =
  'curl -fsSL https://raw.githubusercontent.com/nimeng1222/wait-release/v0.1.72/install-agent.sh -o install-agent.sh && sudo bash install-agent.sh --endpoint "https://<主控地址>" --token "<节点token>"'

const ENV_FILE_CMDS = `sudoedit /opt/wait/wait-agent.env   # 写入 token 与 endpoint
sudo chmod 600 /opt/wait/wait-agent.env
sudo systemctl restart wait-agent`

export function AgentGuide() {
  return (
    <div>
      <DocH1>安装 Agent</DocH1>
      <DocLead>
        Agent（wait-agent）负责采集被控机的 CPU、内存、磁盘、流量等数据并上报给服务端，支持
        Linux / Windows / macOS，资源占用极低。
      </DocLead>

      <DocH2>三步接入一台服务器</DocH2>
      <DocOl>
        <li>
          <strong className="text-slate-100">面板创建节点：</strong>
          登录 wait-monitor 面板，在节点管理中创建节点，获得该节点的 token。
        </li>
        <li>
          <strong className="text-slate-100">被控机运行安装命令：</strong>
        </li>
      </DocOl>
      <CodeBlock code={AGENT_CMD} title="install-agent.sh" />
      <DocUl>
        <li>
          <Code>--endpoint</Code>：主控地址，包含端口（默认 25774）
        </li>
        <li>
          <Code>--token</Code>：上一步创建节点获得的 token
        </li>
      </DocUl>
      <DocOl>
        <li>
          <strong className="text-slate-100">验证上线：</strong>
          回到面板节点列表，节点状态变为「在线」即接入成功，数据秒级刷新。
        </li>
      </DocOl>
      <DocNote>
        Agent 内置指数退避重连机制：网络波动或服务端重启后会自动恢复连接，无需人工干预。
      </DocNote>

      <DocH2>生产环境建议：token 写入环境文件</DocH2>
      <DocP>
        不建议把 token 直接暴露在进程命令行中（<Code>ps</Code> 可见）。推荐写入 systemd
        环境文件并收紧权限，仅 root 可读：
      </DocP>
      <CodeBlock code={ENV_FILE_CMDS} title="/opt/wait/wait-agent.env" />
      <DocP>
        文件内容示例（变量名以安装脚本生成的服务单元为准）：
      </DocP>
      <CodeBlock
        code={'AGENT_TOKEN=<节点token>\nAGENT_ENDPOINT=https://<主控地址>'}
        title="wait-agent.env"
      />

      <DocH2>Windows 安装</DocH2>
      <DocP>
        从{' '}
        <a
          href="https://github.com/nimeng1222/wait-release/releases"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:text-blue-300"
        >
          wait-agent Releases
        </a>{' '}
        下载 Windows 版本，解压后在命令行中以相同的 <Code>--endpoint</Code> / <Code>--token</Code>{' '}
        参数运行即可。
      </DocP>

      <DocH2>常用参数</DocH2>
      <DocTable
        head={['参数', '说明']}
        rows={[
          [<Code key="1">--endpoint</Code>, '主控地址，如 https://<主控地址>（含端口 25774）'],
          [<Code key="2">--token</Code>, '节点 token，在面板创建节点后获得'],
          [<Code key="3">--interval</Code>, '数据采集间隔'],
          [<Code key="4">--reconnect-interval</Code>, '重连基数，断线后按指数退避自动重连'],
        ]}
      />
    </div>
  )
}
