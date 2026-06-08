// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Subsystems/GameInstanceSubsystem.h"
#include "TsObjectBindingSubsystem.generated.h"

DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FTsObjectBindingRequested, UObject*, Object);

UCLASS()
class PUERTSGAMEFRAMEWORK_API UTsObjectBindingSubsystem : public UGameInstanceSubsystem
{
	GENERATED_BODY()

public:
	UPROPERTY(BlueprintAssignable, Category = "Puerts|Object Binding")
	FTsObjectBindingRequested OnObjectBindRequested;

	UPROPERTY(BlueprintAssignable, Category = "Puerts|Object Binding")
	FTsObjectBindingRequested OnObjectUnbindRequested;

	UFUNCTION(BlueprintCallable, Category = "Puerts|Object Binding")
	void BindObject(UObject* Object);

	UFUNCTION(BlueprintCallable, Category = "Puerts|Object Binding")
	void UnbindObject(UObject* Object);
};
