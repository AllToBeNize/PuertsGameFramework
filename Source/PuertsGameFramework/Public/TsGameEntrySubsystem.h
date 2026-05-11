// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "JsEnv.h"
#include "CoreMinimal.h"
#include "Subsystems/GameInstanceSubsystem.h"
#include "TsGameEntrySubsystem.generated.h"

/**
 * 
 */
UCLASS()
class PUERTSGAMEFRAMEWORK_API UTsGameEntrySubsystem : public UGameInstanceSubsystem
{
	GENERATED_BODY()
public:
	
	virtual void Initialize(FSubsystemCollectionBase& Collection) override;
	
	virtual void Deinitialize() override;
	
	void InitGameScript();

private:
	TSharedPtr<puerts::FJsEnv> GameScript;	
};
