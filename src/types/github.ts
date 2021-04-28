interface GithubCommit {
  message: string;
}

interface GithubRepository {
  master_branch?: string;
}

export interface GithubEvent {
  commits?: Array<GithubCommit>;
  ref?: string;
  repository?: GithubRepository;
}
