use serde::Deserialize;

#[derive(Deserialize, Debug)]
#[serde(tag = "type", rename = "network")]
pub struct NetworkProviderConfig {
  pub refresh_interval_ms: u64,
}
