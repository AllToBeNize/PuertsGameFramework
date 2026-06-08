// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Kismet/BlueprintFunctionLibrary.h"
#include "TsObjectBindingLibrary.generated.h"

class UTsObjectBindingSubsystem;

UCLASS()
class PUERTSGAMEFRAMEWORK_API UTsObjectBindingLibrary : public UBlueprintFunctionLibrary
{
	GENERATED_BODY()

public:
	UFUNCTION(BlueprintCallable, Category = "Puerts|Object Binding", meta = (WorldContext = "Object"))
	static bool BindObject(UObject* Object);

	UFUNCTION(BlueprintCallable, Category = "Puerts|Object Binding", meta = (WorldContext = "Object"))
	static bool UnbindObject(UObject* Object);

	UFUNCTION(BlueprintCallable, Category = "Puerts|Object Binding", meta = (WorldContext = "WorldContextObject"))
	static UTsObjectBindingSubsystem* GetObjectBindingSubsystem(const UObject* WorldContextObject);
};
