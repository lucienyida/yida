# custom_components/water_meter/sensor.py
from __future__ import annotations
from homeassistant.components.sensor import SensorEntity
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.typing import ConfigType, DiscoveryInfoType
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN

SENSORS = {
    "owner": ("用户名", "mdi:account", None),
    "address": ("地址", "mdi:home-map-marker", None),
    "balance": ("当前余额", "mdi:cash", "元"),
    "arrears": ("欠费金额", "mdi:alert-circle", "元")
}

async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up sensors with device association."""
    coordinator = hass.data[DOMAIN][entry.entry_id]
    entities = []
    
    for key, (name, icon, unit) in SENSORS.items():
        entities.append(
            WaterMeterSensor(coordinator, key, name, icon, unit)
        )
    
    async_add_entities(entities)

class WaterMeterSensor(CoordinatorEntity, SensorEntity):
    """Water meter sensor with device linkage."""
    
    def __init__(
        self,
        coordinator,
        key: str,
        name: str,
        icon: str,
        unit: str
    ) -> None:
        super().__init__(coordinator)
        self._key = key
        self._attr_name = name
        self._attr_icon = icon
        self._attr_native_unit_of_measurement = unit
        self._attr_unique_id = f"{self.coordinator.entry.entry_id}_{key}"
        self._attr_device_info = self.coordinator.device_info

    @property
    def native_value(self):
        """Return sensor value."""
        return self.coordinator.data.get(self._key, "")