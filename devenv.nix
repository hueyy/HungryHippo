{ pkgs, lib, config, inputs, ... }:

{
  packages = [
    pkgs.git
    pkgs.playwright-test
    pkgs.playwright-driver
  ];

  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_20;
    pnpm.enable = true;
    pnpm.install.enable = true;
  };

  scripts.dev.exec = ''
    pnpm run start:dev
  '';
  scripts.run.exec = ''
    pnpm run build && pnpm run start:prod
  '';

  enterShell = ''
    export PLAYWRIGHT_BROWSERS_PATH=${pkgs.playwright-driver.browsers}
    export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
  '';

  # https://devenv.sh/tests/
  enterTest = ''
    echo "Running tests"
    git --version | grep --color=auto "${pkgs.git.version}"
  '';

  # https://devenv.sh/pre-commit-hooks/
  pre-commit.hooks = {
    shellcheck.enable = true;
    eslint.enable = true;
  };
}
