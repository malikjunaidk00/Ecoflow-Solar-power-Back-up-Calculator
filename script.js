document.getElementById('calculator-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const totalConsumption = parseFloat(document.getElementById('total-consumption').value) * 1000; // in Wh
    const batteryCapacity = parseFloat(document.getElementById('battery-capacity').value) * 1000; // in Wh
    const sunshineHours = parseFloat(document.getElementById('sunshine-hours').value);
    const panelPower = parseFloat(document.getElementById('panel-power').value); // in W
    const inverterCapacity = parseFloat(document.getElementById('inverter-capacity').value) * 1000; // in W

    // Power consumption per hour
    const powerConsumptionPerHour = totalConsumption / 24; // in W

    // Number of hours without sunshine
    const hoursWithoutSunshine = 24 - sunshineHours;

    // Total backup battery storage needed
    const totalBackupBatteryStorageNeeded = powerConsumptionPerHour * hoursWithoutSunshine; // in Wh

    // Number of batteries needed
    const numberOfBatteries = Math.ceil(totalBackupBatteryStorageNeeded / batteryCapacity);

    // Total power supply needed per hour by solar panels
    const totalPowerSupplyNeededPerHour = totalConsumption / sunshineHours; // in W

    // Number of solar panels needed without accounting for 20% losses
    const numberOfSolarPanels = Math.ceil(totalPowerSupplyNeededPerHour / panelPower);

    // Add 20% extra for power losses
    const numberOfSolarPanelsWithLoss = Math.ceil(numberOfSolarPanels * 1.2);

    // Number of inverters needed
    const numberOfInverters = Math.ceil(Math.max(numberOfBatteries / 5, totalPowerSupplyNeededPerHour / inverterCapacity));

    // Display the result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h3>Results</h3>
        <p><strong>Total Power Consumption per hour:</strong> ${powerConsumptionPerHour.toFixed(2)} W</p>
        <p><strong>Total Backup Battery Storage Needed:</strong> ${totalBackupBatteryStorageNeeded.toFixed(2)} Wh</p>
        <p><strong>Number of Batteries Needed:</strong> ${numberOfBatteries}</p>
        <p><strong>Total Power Supply Needed by Solar Panels per Hour:</strong> ${totalPowerSupplyNeededPerHour.toFixed(2)} W</p>
        <p><strong>Number of Solar Panels Needed:</strong> ${numberOfSolarPanelsWithLoss}</p>
        <p><strong>Number of Inverters Needed:</strong> ${numberOfInverters}</p>
    `;
});
