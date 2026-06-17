// Fill out your copyright notice in the Description page of Project Settings.

#include "TsActor.h"

#include "TsObjectBindingLibrary.h"

void ATsActor::BeginPlay()
{
	Super::BeginPlay();

	UTsObjectBindingLibrary::BindObject(this);
}

void ATsActor::EndPlay(const EEndPlayReason::Type EndPlayReason)
{
	UTsObjectBindingLibrary::UnbindObject(this);

	Super::EndPlay(EndPlayReason);
}
