defmodule MicroboxLabs.AuthToken do

  alias MicroboxLabs.AuthToken

  defstruct client_id: nil, client_secret: nil, audience: nil, grant_type: nil, token: nil, expiry: nil

  def new(client_id, client_secret, audience, grant_type) do
    %AuthToken{client_id: client_id, client_secret: client_secret, audience: audience, grant_type: grant_type}
  end

  defp fetch_token(%AuthToken{client_id: client_id, client_secret: client_secret, audience: audience, grant_type: grant_type}) do
    endpoint = "https://api.microboxlabs.com/api/v1/login"
    response = HTTPoison.post!(endpoint, {:form, [
      {"client_id", client_id},
      {"client_secret", client_secret},
      {"audience", audience},
      {"grant_type", grant_type}
    ]})

    case response do
      %HTTPoison.Response{status_code: 200, body: body} ->
        {:ok, body |> Poison.decode!()}

      _ ->
        {:error, "Failed to fetch token"}
    end
  end




  def get_token(%AuthToken{token: nil} = auth_token) do
    fetch_and_update_token(auth_token)
  end

  def get_token(%AuthToken{token: token, expiry: expiry} = auth_token) do
    if DateTime.compare(DateTime.utc_now(), expiry) == :gt do
      fetch_and_update_token(auth_token)
    else
      token
    end
  end

  def get_token(%AuthToken{token: token}), do: token

  defp fetch_and_update_token(auth_token) do
    {:ok, token_data} = fetch_token(auth_token)
    access_token = token_data["access_token"]
    expires_in = token_data["expires_in"]
    expiry = DateTime.add(DateTime.utc_now(), expires_in, :second)

    Map.update!(auth_token, :token, fn _ -> access_token end)
    Map.update!(auth_token, :expiry, fn _ -> expiry end)
    access_token
  end

  defp is_token_expired?(%AuthToken{expiry: expiry}), do: DateTime.compare(DateTime.utc_now(), expiry) == :gt
end
