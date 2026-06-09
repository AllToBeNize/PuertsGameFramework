// Fill out your copyright notice in the Description page of Project Settings.

#include "TsComponent.h"

#include "TsObjectBindingLibrary.h"

void UTsComponent::BeginPlay()
{
	Super::BeginPlay();

	UTsObjectBindingLibrary::BindObject(this);
}

void UTsComponent::EndPlay(const EEndPlayReason::Type EndPlayReason)
{
	UTsObjectBindingLibrary::UnbindObject(this);

	Super::EndPlay(EndPlayReason);
}
