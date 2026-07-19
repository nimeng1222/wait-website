import { CodeBlock } from '@/components/CodeBlock'
import { Code, DocH1, DocH2, DocLead, DocNote, DocOl, DocP, DocUl } from '@/components/doc'

const UPGRADE_CMD =
  'curl -fsSL https://raw.githubusercontent.com/nimeng1222/wait-release/main/install-wait.sh -o install-wait.sh && sudo bash install-wait.sh'
const LOG_CMDS = `sudo journalctl -u wait-monitor -f   # 服务端日志
sudo journalctl -u wait-agent -f     # Agent 日志`
const DATA_TREE = `/opt/wait-monitor/
├── wait-monitor                          # 服务端二进制（升级时自动备份旧版本）
└── data/                                 # 数据目录
    ├── *.db                              # SQLite 数据库（节点、账单、告警等全部数据）
    └── initial-admin-credentials.json    # 初始账号密码（首次登录后自动删除）`

export function Maintenance() {
  return (
    <div>
      <DocH1>升级与维护</DocH1>
      <DocLead>升级、卸载、日志与数据目录的日常维护说明。</DocLead>

      <DocH2>升级</DocH2>
      <DocP>重新运行一键安装脚本，在交互菜单中选择「升级」：</DocP>
      <CodeBlock code={UPGRADE_CMD} title="install-wait.sh" />
      <DocP>升级流程具备安全保障：</DocP>
      <DocUl>
        <li>升级前自动备份旧版本二进制；</li>
        <li>新版本启动失败时自动回滚到备份版本；</li>
        <li>安装包经过 SHA-256 校验与 ECDSA 签名验证，验签失败拒绝安装。</li>
      </DocUl>
      <DocP>
        需要固定到指定版本时，先设置 <Code>WAIT_MAIN_RELEASE_VERSION</Code>（如{' '}
        <Code>vX.Y.Z</Code>）再执行脚本；不设置则升级为最新版本。
      </DocP>

      <DocH2>卸载</DocH2>
      <DocP>在安装脚本的交互菜单中选择「卸载」。卸载行为：</DocP>
      <DocUl>
        <li>
          停止并移除 systemd 服务、删除程序文件；
        </li>
        <li>
          数据目录 <Code>/opt/wait-monitor/data</Code> 默认保留，重新安装后可继续使用；
        </li>
        <li>脚本会提示是否一并删除数据目录，确认后才彻底清理。</li>
      </DocUl>

      <DocH2>日志查看</DocH2>
      <DocP>两种方式：安装脚本菜单中的「日志」，或直接使用 journalctl：</DocP>
      <CodeBlock code={LOG_CMDS} title="journalctl" />

      <DocH2>数据目录结构</DocH2>
      <CodeBlock code={DATA_TREE} title="/opt/wait-monitor" />
      <DocNote>
        全部业务数据都在 <Code>/opt/wait-monitor/data</Code> 的 SQLite
        数据库中。备份整站数据只需备份该目录。
      </DocNote>
    </div>
  )
}
