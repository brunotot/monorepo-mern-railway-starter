import { type ClassMetadataInjectType, ClassMetadataEntry } from "@tsvdec/decorators";
import { type TODO } from "@org/shared";

export type InjectionMetaItem = {
  name: string;
  dependencies: string[];
  constructorParams: TODO[];
};

export class InjectionDecoratorManager extends ClassMetadataEntry<InjectionMetaItem> {
  static from(injection: ClassMetadataInjectType) {
    return new InjectionDecoratorManager(injection);
  }

  private constructor(injection: ClassMetadataInjectType) {
    super(injection, () => ({
      name: "",
      dependencies: [],
      constructorParams: [],
    }));
  }

  setConstructorParams(params: TODO[]) {
    this.value.constructorParams = params;
  }

  setName(name: string) {
    this.value.name = name;
  }

  addDependency(name: string) {
    this.value.dependencies.push(name);
  }
}