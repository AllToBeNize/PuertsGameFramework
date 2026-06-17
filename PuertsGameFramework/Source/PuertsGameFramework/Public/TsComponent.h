// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "TsComponent.generated.h"

UCLASS(Blueprintable, ClassGroup = (Puerts), meta = (BlueprintSpawnableComponent))
class PUERTSGAMEFRAMEWORK_API UTsComponent : public UActorComponent
{
	GENERATED_BODY()

public:
	virtual void BeginPlay() override;
	virtual void EndPlay(const EEndPlayReason::Type EndPlayReason) override;
};
