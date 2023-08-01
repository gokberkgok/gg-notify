--Gökberk#3151
RegisterNetEvent('gg:notify')
AddEventHandler('gg:notify', function(message, notificationType, duration)
    SendNUIMessage({
        type = 'gg:notify',
        message = message,
        notificationType = notificationType,
        duration = duration
    })
end)

RegisterCommand('ggnoti', function()
	TriggerEvent('gg:notify', 'You withdraw 100$ in your bank', 'info', 3000)
end) 

RegisterCommand('ggnoti2', function()
	TriggerEvent('gg:notify', 'You withdraw 100$ in your bank', 'info', 3000)	
	Wait(2000)
	TriggerEvent('gg:notify', 'You dont have enough money to buy this item', 'error', 3000)
	Wait(2000)
	TriggerEvent('gg:notify', 'Object placed successfully', 'success', 3000)
end) 

--Gökberk#3151





