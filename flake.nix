{
  description = "willisplummer.com — Elm personal website";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      # Systems this flake supports.
      systems = [ "aarch64-darwin" "x86_64-darwin" "aarch64-linux" "x86_64-linux" ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});
    in
    {
      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShell {
          packages = [
            # Node runtime for the Elm tooling below (current maintained LTS).
            pkgs.nodejs_22

            # Elm toolchain (elm.json pins elm-version 0.19.1).
            pkgs.elmPackages.elm
            pkgs.elmPackages.elm-test
            pkgs.elmPackages.elm-live
            pkgs.elmPackages.elm-format

            # Used by build.sh to minify the compiled output.
            pkgs.uglify-js
          ];

          shellHook = ''
            echo "elm-personal-website dev shell"
            echo "  elm       $(elm --version)"
            echo "  node      $(node --version)"
            echo "  elm-test / elm-live / uglifyjs on PATH"
          '';
        };
      });
    };
}
