// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "UObject/Object.h"
#include "TsSettings.generated.h"

/**
 * 
 */
UCLASS(config = Puerts, defaultconfig, meta = (DisplayName = "TsGameFrameworkSettings"))
class PUERTSGAMEFRAMEWORK_API UTsSettings : public UObject
{
	GENERATED_BODY()
	
public:
	UPROPERTY(config, EditAnywhere, Category = "Default JavaScript Environment",
		meta = (defaultValue = "JavaScript", Tooltip = "JavaScript Source Code Root Path", DisplayName = "JavaScript Source Root"))
	FString RootPath = "JavaScript";

	UPROPERTY(config, EditAnywhere, Category = "Default JavaScript Environment")
	FString EntryScriptPath = "Entry.ts";
	
	UPROPERTY(
		config, EditAnywhere, Category = "Default JavaScript Environment", meta = (DisplayName = "AutoStartJsEnv", defaultValue = true))
	bool bAutoStartJsEnv = true;

	UPROPERTY(config, EditAnywhere, Category = "Default JavaScript Environment",
		meta = (DisplayName = "Debug Enable", defaultValue = true))
	bool bDebugEnable = true;

	UPROPERTY(
		config, EditAnywhere, Category = "Default JavaScript Environment", meta = (DisplayName = "Debug Port", defaultValue = 8080))
	int32 DebugPort = 8080;

	UPROPERTY(config, EditAnywhere, Category = "Default JavaScript Environment",
		meta = (DisplayName = "Wait Debugger", defaultValue = false))
	bool bWaitDebugger = false;

	UPROPERTY(config, EditAnywhere, Category = "Default JavaScript Environment",
		meta = (DisplayName = "Wait Debugger Timeout", defaultValue = 0))
	double WaitDebuggerTimeout = 10;
	
};
