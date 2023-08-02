defmodule MicroboxLabs.AuthManager.MixProject do
  use Mix.Project

  def project do
    [
      app: :microboxlabs_auth_manager,
      version: "0.1.0",
      elixir: "~> 1.14",
      start_permanent: Mix.env() == :prod,
      description: description(),
      package: package(),
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      applications: [:httpoison],
      extra_applications: [:logger, :poison]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      # {:dep_from_hexpm, "~> 0.3.0"},
      # {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"}
      {:poison, "~> 5.0"},
      {:httpoison, "~> 2.0"},
      {:mock, "~> 0.3.8", only: :test},
      {:ex_doc, "~> 0.27", only: :dev, runtime: false},
    ]
  end

  defp description do
    """
    Auth Manager is a tool interact and manage authentication with
    Microboxlabs
    """
  end

  defp package do
    [
      files: ["lib", "mix.exs", "README.md"],
      maintainers: ["Microboxlabs"],
      licenses: ["MIT"],
      links: %{"GitHub" => "https://github.com/microboxlabs/auth-manager"}
    ]
  end
end
