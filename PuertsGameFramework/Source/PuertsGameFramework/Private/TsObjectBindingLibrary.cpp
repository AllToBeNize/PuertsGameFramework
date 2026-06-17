// Fill out your copyright notice in the Description page of Project Settings.

#include "TsObjectBindingLibrary.h"

#include "Engine/Engine.h"
#include "Engine/GameInstance.h"
#include "Engine/World.h"
#include "TsObjectBindingSubsystem.h"

bool UTsObjectBindingLibrary::BindObject(UObject* Object)
{
	if (UTsObjectBindingSubsystem* BindingSubsystem = GetObjectBindingSubsystem(Object))
	{
		BindingSubsystem->BindObject(Object);
		return true;
	}

	return false;
}

bool UTsObjectBindingLibrary::UnbindObject(UObject* Object)
{
	if (UTsObjectBindingSubsystem* BindingSubsystem = GetObjectBindingSubsystem(Object))
	{
		BindingSubsystem->UnbindObject(Object);
		return true;
	}

	return false;
}

UTsObjectBindingSubsystem* UTsObjectBindingLibrary::GetObjectBindingSubsystem(const UObject* WorldContextObject)
{
	if (!IsValid(WorldContextObject) || !GEngine)
	{
		return nullptr;
	}

	UWorld* World = GEngine->GetWorldFromContextObject(WorldContextObject, EGetWorldErrorMode::ReturnNull);
	if (!World)
	{
		return nullptr;
	}

	UGameInstance* GameInstance = World->GetGameInstance();
	return GameInstance ? GameInstance->GetSubsystem<UTsObjectBindingSubsystem>() : nullptr;
}
