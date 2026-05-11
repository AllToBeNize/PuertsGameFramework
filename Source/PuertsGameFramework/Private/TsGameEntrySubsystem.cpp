// Fill out your copyright notice in the Description page of Project Settings.


#include "TsGameEntrySubsystem.h"

#include "TsSettings.h"


void UTsGameEntrySubsystem::Initialize(FSubsystemCollectionBase& Collection)
{
	Super::Initialize(Collection);
	InitGameScript();
}

void UTsGameEntrySubsystem::Deinitialize()
{
	if (GameScript.IsValid())
	{
		GameScript.Reset();
	}
	Super::Deinitialize();
}

void UTsGameEntrySubsystem::InitGameScript()
{
	if (GameScript.IsValid())
	{
		return;
	}
	
	const UTsSettings& Settings = *GetDefault<UTsSettings>();

	if (Settings.bAutoStartJsEnv)
	{
		if (Settings.bDebugEnable)
		{
			GameScript = MakeShared<puerts::FJsEnv>(
			std::make_unique<puerts::DefaultJSModuleLoader>(Settings.RootPath), 
			std::make_shared<puerts::FDefaultLogger>(), 
			Settings.DebugPort);
			if (Settings.bWaitDebugger)
			{
				GameScript->WaitDebugger(Settings.DebugPort);
			}
		}
		else
		{
			GameScript = MakeShared<puerts::FJsEnv>(Settings.RootPath);
		}
		
		TArray<TPair<FString, UObject*>> Arguments;
		Arguments.Add(TPair<FString, UObject*>(TEXT("GameInstance"), this));
		
		GameScript->Start(Settings.EntryScriptPath, Arguments);
	}
}
