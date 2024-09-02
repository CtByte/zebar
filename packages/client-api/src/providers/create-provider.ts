import {
  createBatteryProvider,
  type BatteryProviderConfig,
} from './battery/create-battery-provider';
import {
  createCpuProvider,
  type CpuProviderConfig,
} from './cpu/create-cpu-provider';
// import {
//   createDateProvider,
//   type DateProviderConfig,
// } from './date/create-date-provider';
// import {
//   createGlazeWmProvider,
//   type GlazeWmProviderConfig,
// } from './glazewm/create-glazewm-provider';
// import {
//   createHostProvider,
//   type HostProviderConfig,
// } from './host/create-host-provider';
// import {
//   createIpProvider,
//   type IpProviderConfig,
// } from './ip/create-ip-provider';
// import {
//   createKomorebiProvider,
//   type KomorebiProviderConfig,
// } from './komorebi/create-komorebi-provider';
// import {
//   createMemoryProvider,
//   type MemoryProviderConfig,
// } from './memory/create-memory-provider';
// import {
//   createNetworkProvider,
//   type NetworkProviderConfig,
// } from './network/create-network-provider';
// import {
//   createUtilProvider,
//   type UtilProviderConfig,
// } from './util/create-util-provider';
// import {
//   createWeatherProvider,
//   type WeatherProviderConfig,
// } from './weather/create-weather-provider';

export type ProviderConfig = BatteryProviderConfig | CpuProviderConfig;
// | DateProviderConfig
// | GlazeWmProviderConfig
// | HostProviderConfig
// | IpProviderConfig
// | KomorebiProviderConfig
// | MemoryProviderConfig
// | NetworkProviderConfig
// | UtilProviderConfig
// | WeatherProviderConfig;

export type ProviderType = ProviderConfig['type'];

const createProviderMap = {
  battery: createBatteryProvider,
  cpu: createCpuProvider,
  // date: createDateProvider,
  // glazewm: createGlazeWmProvider,
  // host: createHostProvider,
  // ip: createIpProvider,
  // komorebi: createKomorebiProvider,
  // memory: createMemoryProvider,
  // network: createNetworkProvider,
  // util: createUtilProvider,
  // weather: createWeatherProvider,
} as const;

export interface Provider<T> {
  /**
   * Current value of the provider.
   */
  val: T;

  /**
   * Refresh the provider's value.
   */
  refresh(): Promise<T>;

  /**
   * Stop the provider.
   */
  shutdown(): Promise<void>;

  /**
   * Listen for changes to the provider's value.
   * @param callback - Callback to run when the value changes.
   */
  onChange(callback: (nextVal: T) => void): void;
}

type ProviderMap = typeof createProviderMap;

/**
 * Utility type to get the return value of a provider.
 *
 * @example `Provider<'battery'> = BatteryProvider`
 */
export type ProviderOutput<T extends ProviderType> = ReturnType<
  ProviderMap[T]
>;

export function createProvider<T extends ProviderConfig>(
  config: T,
): ProviderOutput<T['type']> {
  const providerFn = createProviderMap[config.type];

  if (!providerFn) {
    throw new Error('Not a supported provider type.');
  }

  return providerFn(config as any) as ProviderOutput<T['type']>;
}
