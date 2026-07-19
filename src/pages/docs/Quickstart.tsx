import { CodeBlock } from '@/components/CodeBlock'
import { Code, DocH1, DocH2, DocH3, DocLead, DocNote, DocP, DocUl } from '@/components/doc'

const INSTALL_CMD =
  'curl -fsSL https://raw.githubusercontent.com/nimeng1222/wait-release/main/install-wait.sh -o install-wait.sh && sudo bash install-wait.sh'
const DOCKER_CMD =
  'docker run -d -p 25774:25774 -v $(pwd)/data:/app/data --name wait ghcr.io/nimeng1222/wait-monitor:latest'
const SYSTEMD_CMDS = `sudo systemctl status wait-monitor   # 查看运行状态
sudo systemctl restart wait-monitor  # 重启服务
sudo systemctl stop wait-monitor     # 停止服务
sudo journalctl -u wait-monitor -f   # 实时跟踪日志`

export function Quickstart() {
  return (
    <div>
      <DocH1>快速开始</DocH1>
      <DocLead>
        wait-monitor 服务端支持 Linux amd64 / arm64，提供一键脚本、Docker、二进制三种部署方式。
        服务端为 Go 单二进制，内嵌前端与 SQLite，零外部依赖。
      </DocLead>

      <DocH2>方式一：一键脚本（推荐）</DocH2>
      <DocP>在服务器上以 root 权限执行：</DocP>
      <CodeBlock code={INSTALL_CMD} title="install-wait.sh" />
      <DocP>脚本会进入交互式菜单，提供以下操作：</DocP>
      <DocUl>
        <li>安装 / 升级 / 卸载</li>
        <li>查看服务状态 / 查看日志</li>
        <li>重启 / 停止服务</li>
      </DocUl>
      <DocP>安装完成后：</DocP>
      <DocUl>
        <li>
          安装目录 <Code>/opt/wait-monitor</Code>，数据目录 <Code>/opt/wait-monitor/data</Code>
        </li>
        <li>
          默认监听 <Code>0.0.0.0:25774</Code>，由 systemd 托管并开机自启
        </li>
        <li>
          初始账号密码写入 <Code>/opt/wait-monitor/data/initial-admin-credentials.json</Code>
        </li>
      </DocUl>

      <DocH2>方式二：Docker 部署</DocH2>
      <CodeBlock code={DOCKER_CMD} title="docker" />
      <DocP>
        初始账号密码输出在容器日志中，执行 <Code>docker logs wait</Code>{' '}
        查看；也可在挂载的数据目录下找到 <Code>initial-admin-credentials.json</Code>。
      </DocP>

      <DocH2>方式三：二进制部署</DocH2>
      <DocP>
        从{' '}
        <a
          href="https://github.com/nimeng1222/wait-monitor/releases"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:text-blue-300"
        >
          Releases
        </a>{' '}
        下载对应架构的二进制，赋予执行权限后直接运行即可，无需安装任何运行时。
      </DocP>
      <CodeBlock code={'chmod +x wait-monitor\n./wait-monitor'} title="直接运行" />

      <DocH2>初始账号密码</DocH2>
      <DocP>首次启动会自动生成随机管理员账号密码，存放位置：</DocP>
      <DocUl>
        <li>
          脚本 / 二进制安装：<Code>/opt/wait-monitor/data/initial-admin-credentials.json</Code>
        </li>
        <li>
          Docker 部署：<Code>docker logs wait</Code> 或数据目录下的同名文件
        </li>
      </DocUl>
      <DocNote>
        出于安全考虑，该文件在首次登录成功后会自动删除，请在首次登录后立即修改密码。
      </DocNote>

      <DocH2>访问面板</DocH2>
      <DocP>
        浏览器打开 <Code>http://&lt;服务器IP&gt;:25774</Code>
        即可访问。请确认防火墙 / 云安全组已放行 25774 端口。
      </DocP>

      <DocH3>systemd 常用命令</DocH3>
      <CodeBlock code={SYSTEMD_CMDS} title="systemd" />
    </div>
  )
}
