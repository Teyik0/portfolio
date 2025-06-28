import { NextjsSvg } from './icons/nextjs';

export interface TechItem {
  name: string;
  icon: string | React.ReactNode;
  category: string;
  url?: string;
}

export const techStackData: Record<string, TechItem[]> = {
  TypeScript: [
    {
      name: 'TypeScript',
      icon: 'https://svgl.app/library/typescript.svg',
      category: 'Language',
      url: 'https://www.typescriptlang.org/',
    },
    {
      name: 'React',
      icon: 'https://svgl.app/library/react_light.svg',
      category: 'Library',
      url: 'https://react.dev/',
    },
    {
      name: 'Next.js',
      icon: <NextjsSvg className="size-8" />,
      category: 'Framework',
      url: 'https://nextjs.org/',
    },
    {
      name: 'Qwik',
      icon: 'https://svgl.app/library/qwik.svg',
      category: 'Framework',
      url: 'https://qwik.builder.io/',
    },
    {
      name: 'Bun',
      icon: 'https://svgl.app/library/bun.svg',
      category: 'Runtime',
      url: 'https://bun.sh/',
    },
    {
      name: 'Prisma',
      icon: 'https://svgl.app/library/prisma_dark.svg',
      category: 'ORM',
      url: 'https://www.prisma.io/',
    },
    {
      name: 'Tailwind',
      icon: 'https://svgl.app/library/tailwindcss.svg',
      category: 'Framework',
      url: 'https://tailwindcss.com/',
    },
    {
      name: 'Shadcn Ui',
      icon: 'https://svgl.app/library/shadcn-ui_dark.svg',
      category: 'Framework',
      url: 'https://ui.shadcn.com/',
    },
    {
      name: 'Elysia.js',
      icon: 'https://svgl.app/library/elysiajs.svg',
      category: 'Framework',
      url: 'https://elysiajs.com/',
    },
    {
      name: 'Express',
      icon: 'https://svgl.app/library/expressjs_dark.svg',
      category: 'Framework',
      url: 'https://expressjs.com/',
    },
    {
      name: 'Biome',
      icon: 'https://svgl.app/library/biomejs.svg',
      category: 'Linter',
      url: 'https://biomejs.dev/',
    },
    {
      name: 'Node.js',
      icon: 'https://svgl.app/library/nodejs.svg',
      category: 'Runtime',
      url: 'https://nodejs.org/',
    },
  ],
  Python: [
    {
      name: 'Python',
      icon: 'https://svgl.app/library/python.svg',
      category: 'Language',
      url: 'https://www.python.org/',
    },
    {
      name: 'Pydantic',
      icon: 'https://svgl.app/library/pydantic.svg',
      category: 'Library',
      url: 'https://docs.pydantic.dev/',
    },
    {
      name: 'UV',
      icon: 'https://svgl.app/library/uv.svg',
      category: 'Tool',
      url: 'https://docs.astral.sh/uv/',
    },
    {
      name: 'Ruff',
      icon: 'https://svgl.app/library/ruff.svg',
      category: 'Linter',
      url: 'https://docs.astral.sh/ruff/',
    },
    {
      name: 'Pytest',
      icon: 'https://svgl.app/library/pytest.svg',
      category: 'Testing',
      url: 'https://pytest.org/',
    },
    {
      name: 'Pandas',
      icon: 'https://svgl.app/library/pandas.svg',
      category: 'Library',
      url: 'https://pandas.pydata.org/',
    },
    {
      name: 'NumPy',
      icon: 'https://svgl.app/library/numpy.svg',
      category: 'Library',
      url: 'https://numpy.org/',
    },
  ],
  Blockchain: [
    {
      name: 'Viem',
      icon: 'https://svgl.app/library/viem.svg',
      category: 'Library',
      url: 'https://viem.sh/',
    },
    {
      name: 'Solidity',
      icon: 'https://svgl.app/library/solidity.svg',
      category: 'Language',
      url: 'https://soliditylang.org/',
    },
    {
      name: 'Hardhat',
      icon: 'https://svgl.app/library/hardhat.svg',
      category: 'Framework',
      url: 'https://hardhat.org/',
    },
    {
      name: 'Foundry',
      icon: 'https://svgl.app/library/foundry.svg',
      category: 'Framework',
      url: 'https://getfoundry.sh/',
    },
    {
      name: 'Wagmi',
      icon: 'https://svgl.app/library/wagmi.svg',
      category: 'Library',
      url: 'https://wagmi.sh/',
    },
    {
      name: 'MetaMask',
      icon: 'https://svgl.app/library/metamask.svg',
      category: 'Wallet',
      url: 'https://metamask.io/',
    },
    {
      name: 'Anchor Framework',
      icon: 'https://svgl.app/library/anchor.svg',
      category: 'Framework',
      url: 'https://www.anchor-lang.com/',
    },
  ],
  Infrastructure: [
    {
      name: 'Vercel',
      icon: 'https://svgl.app/library/vercel.svg',
      category: 'Hosting',
      url: 'https://vercel.com/',
    },
    {
      name: 'Netlify',
      icon: 'https://svgl.app/library/netlify.svg',
      category: 'Hosting',
      url: 'https://www.netlify.com/',
    },
    {
      name: 'Railway',
      icon: 'https://svgl.app/library/railway.svg',
      category: 'Hosting',
      url: 'https://railway.app/',
    },
    {
      name: 'Supabase',
      icon: 'https://svgl.app/library/supabase.svg',
      category: 'Backend',
      url: 'https://supabase.com/',
    },
    {
      name: 'AWS',
      icon: 'https://svgl.app/library/aws.svg',
      category: 'Cloud',
      url: 'https://aws.amazon.com/',
    },
  ],
  DevOps: [
    {
      name: 'Docker',
      icon: 'https://svgl.app/library/docker.svg',
      category: 'Container',
      url: 'https://www.docker.com/',
    },
    {
      name: 'Kubernetes',
      icon: 'https://svgl.app/library/kubernetes.svg',
      category: 'Orchestration',
      url: 'https://kubernetes.io/',
    },
    {
      name: 'GitHub Actions',
      icon: 'https://svgl.app/library/github-actions.svg',
      category: 'CI/CD',
      url: 'https://github.com/features/actions',
    },
    {
      name: 'Git',
      icon: 'https://svgl.app/library/git.svg',
      category: 'Version Control',
      url: 'https://git-scm.com/',
    },
    {
      name: 'GitHub',
      icon: 'https://svgl.app/library/github.svg',
      category: 'Platform',
      url: 'https://github.com/',
    },
    {
      name: 'GitLab',
      icon: 'https://svgl.app/library/gitlab.svg',
      category: 'Platform',
      url: 'https://gitlab.com/',
    },
    {
      name: 'Terraform',
      icon: 'https://svgl.app/library/terraform.svg',
      category: 'IaC',
      url: 'https://www.terraform.io/',
    },
    {
      name: 'Jenkins',
      icon: 'https://svgl.app/library/jenkins.svg',
      category: 'CI/CD',
      url: 'https://www.jenkins.io/',
    },
  ],
  Others: [
    {
      name: 'Go',
      icon: 'https://svgl.app/library/go.svg',
      category: 'Language',
      url: 'https://golang.org/',
    },
    {
      name: 'C',
      icon: 'https://svgl.app/library/c.svg',
      category: 'Language',
      url: 'https://en.wikipedia.org/wiki/C_(programming_language)',
    },
    {
      name: 'C++',
      icon: 'https://svgl.app/library/cpp.svg',
      category: 'Language',
      url: 'https://isocpp.org/',
    },
    {
      name: 'Java',
      icon: 'https://svgl.app/library/java.svg',
      category: 'Language',
      url: 'https://www.java.com/',
    },
    {
      name: 'Groovy',
      icon: 'https://svgl.app/library/groovy.svg',
      category: 'Language',
      url: 'https://groovy-lang.org/',
    },
  ],
};
