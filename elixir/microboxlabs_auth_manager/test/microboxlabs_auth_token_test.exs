defmodule MicroboxLabs.AuthTokenTest do
  use ExUnit.Case

  import Mock

  alias MicroboxLabs.AuthToken

  test "fetches token when none exists" do
    with_mock HTTPoison, [post!: fn(_, _) ->
      %HTTPoison.Response{status_code: 200, body: Poison.encode!(%{"access_token" => "sample_token", "expires_in" => 3600})}
    end] do
      token = AuthToken.new("client_id", "client_secret", "audience", "grant_type")
      assert AuthToken.get_token(token) == "sample_token"
    end
  end

  test "fetches token when token is expired" do
    with_mock HTTPoison, [post!: fn(_, _) ->
      %HTTPoison.Response{status_code: 200, body: Poison.encode!(%{"access_token" => "sample_token", "expires_in" => 3600})}
    end] do
      token = AuthToken.new("client_id", "client_secret", "audience", "grant_type")
      expired_token = %AuthToken{token | token: "expired_token", expiry: DateTime.add(DateTime.utc_now(), -10, :second)}
      assert AuthToken.get_token(expired_token) == "sample_token"
    end
  end

  test "returns current token when token is not expired" do
    with_mock HTTPoison, [post!: fn(_, _) ->
      %HTTPoison.Response{status_code: 200, body: Poison.encode!(%{"access_token" => "sample_token", "expires_in" => 3600})}
    end] do
      token = AuthToken.new("client_id", "client_secret", "audience", "grant_type")
      valid_token = %AuthToken{token | token: "valid_token", expiry: DateTime.add(DateTime.utc_now(), 3600, :second)}
      assert AuthToken.get_token(valid_token) == "valid_token"
    end
  end
end
