// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "JsEnv.h"
#include "CoreMinimal.h"
#include "Subsystems/GameInstanceSubsystem.h"
#include "TsStartupSubsystem.generated.h"

/**
 * 
 */
UCLASS()
class PUERTSGAMEFRAMEWORK_API UTsStartupSubsystem : public UGameInstanceSubsystem
{
	GENERATED_BODY()
public:
	
	virtual void Initialize(FSubsystemCollectionBase& Collection) override;
	
	virtual void Deinitialize() override;
	
	void StartGameScript();

private:
	TSharedPtr<puerts::FJsEnv> GameScript;	
};
