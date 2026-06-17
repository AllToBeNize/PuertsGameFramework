// Fill out your copyright notice in the Description page of Project Settings.

#include "TsObjectBindingSubsystem.h"

void UTsObjectBindingSubsystem::BindObject(UObject* Object)
{
	if (!IsValid(Object))
	{
		return;
	}

	OnObjectBindRequested.Broadcast(Object);
}

void UTsObjectBindingSubsystem::UnbindObject(UObject* Object)
{
	if (!IsValid(Object))
	{
		return;
	}

	OnObjectUnbindRequested.Broadcast(Object);
}
