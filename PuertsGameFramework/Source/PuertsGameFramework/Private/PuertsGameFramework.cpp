// Copyright Epic Games, Inc. All Rights Reserved.

#include "PuertsGameFramework.h"

#include "ISettingsModule.h"
#include "TsSettings.h"

#define LOCTEXT_NAMESPACE "FPuertsGameFrameworkModule"

void FPuertsGameFrameworkModule::StartupModule()
{
	// This code will execute after your module is loaded into memory; the exact timing is specified in the .uplugin file per-module
	
	if (ISettingsModule* SettingsModule = FModuleManager::GetModulePtr<ISettingsModule>("Settings"))
	{
		SettingsModule->RegisterSettings("Project", "Plugins", "PuertsGameFramework",
			LOCTEXT("TileSetEditorSettingsName", "PuertsGameFramework Settings"),
			LOCTEXT("TileSetEditorSettingsDescription", "Configure the setting of PuertsGameFramework plugin."),
			GetMutableDefault<UTsSettings>());
	}
}

void FPuertsGameFrameworkModule::ShutdownModule()
{
	// This function may be called during shutdown to clean up your module.  For modules that support dynamic reloading,
	// we call this function before unloading the module.
	
	if (ISettingsModule* SettingsModule = FModuleManager::GetModulePtr<ISettingsModule>("Settings"))
	{
		SettingsModule->UnregisterSettings("Project", "Plugins", "PuertsGameFramework");
	}
}

#undef LOCTEXT_NAMESPACE
	
IMPLEMENT_MODULE(FPuertsGameFrameworkModule, PuertsGameFramework)