import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CognitoGroup = {
  __typename?: 'CognitoGroup';
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type CognitoGroupsResult = {
  __typename?: 'CognitoGroupsResult';
  groups?: Maybe<Array<Maybe<CognitoGroup>>>;
};

export type CognitoGroupsUnion = CognitoGroupsResult | CustomError;

export type CustomError = {
  __typename?: 'CustomError';
  error?: Maybe<Error>;
};

export type CustomGraphQlResult = CustomError | GenericResult;

export type Error = {
  __typename?: 'Error';
  message: Scalars['String']['output'];
};

export type GenericResult = {
  __typename?: 'GenericResult';
  result?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserToGroup?: Maybe<CustomGraphQlResult>;
  confirmSignup?: Maybe<CustomGraphQlResult>;
  login?: Maybe<CustomGraphQlResult>;
  resendConfirmationCode?: Maybe<CustomGraphQlResult>;
  signup?: Maybe<SignupResult>;
  userGroups?: Maybe<CognitoGroupsUnion>;
};


export type MutationAddUserToGroupArgs = {
  groupName: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationConfirmSignupArgs = {
  code: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationResendConfirmationCodeArgs = {
  username: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUserGroupsArgs = {
  username: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  cognitoGroups?: Maybe<CognitoGroupsUnion>;
  hello?: Maybe<Scalars['String']['output']>;
};

export type SignupResult = CustomError | User;

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isConfirmed?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  CognitoGroupsUnion: ( CognitoGroupsResult ) | ( CustomError );
  CustomGraphQlResult: ( CustomError ) | ( GenericResult );
  SignupResult: ( CustomError ) | ( User );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CognitoGroup: ResolverTypeWrapper<CognitoGroup>;
  CognitoGroupsResult: ResolverTypeWrapper<CognitoGroupsResult>;
  CognitoGroupsUnion: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CognitoGroupsUnion']>;
  CustomError: ResolverTypeWrapper<CustomError>;
  CustomGraphQlResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CustomGraphQlResult']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Error: ResolverTypeWrapper<Error>;
  GenericResult: ResolverTypeWrapper<GenericResult>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SignupResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SignupResult']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CognitoGroup: CognitoGroup;
  CognitoGroupsResult: CognitoGroupsResult;
  CognitoGroupsUnion: ResolversUnionTypes<ResolversParentTypes>['CognitoGroupsUnion'];
  CustomError: CustomError;
  CustomGraphQlResult: ResolversUnionTypes<ResolversParentTypes>['CustomGraphQlResult'];
  DateTime: Scalars['DateTime']['output'];
  Error: Error;
  GenericResult: GenericResult;
  ID: Scalars['ID']['output'];
  Mutation: {};
  Query: {};
  SignupResult: ResolversUnionTypes<ResolversParentTypes>['SignupResult'];
  String: Scalars['String']['output'];
  User: User;
};

export type CognitoGroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['CognitoGroup'] = ResolversParentTypes['CognitoGroup']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CognitoGroupsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CognitoGroupsResult'] = ResolversParentTypes['CognitoGroupsResult']> = {
  groups?: Resolver<Maybe<Array<Maybe<ResolversTypes['CognitoGroup']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CognitoGroupsUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CognitoGroupsUnion'] = ResolversParentTypes['CognitoGroupsUnion']> = {
  __resolveType: TypeResolveFn<'CognitoGroupsResult' | 'CustomError', ParentType, ContextType>;
};

export type CustomErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomError'] = ResolversParentTypes['CustomError']> = {
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomGraphQlResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomGraphQlResult'] = ResolversParentTypes['CustomGraphQlResult']> = {
  __resolveType: TypeResolveFn<'CustomError' | 'GenericResult', ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenericResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GenericResult'] = ResolversParentTypes['GenericResult']> = {
  result?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addUserToGroup?: Resolver<Maybe<ResolversTypes['CustomGraphQlResult']>, ParentType, ContextType, RequireFields<MutationAddUserToGroupArgs, 'groupName' | 'username'>>;
  confirmSignup?: Resolver<Maybe<ResolversTypes['CustomGraphQlResult']>, ParentType, ContextType, RequireFields<MutationConfirmSignupArgs, 'code' | 'username'>>;
  login?: Resolver<Maybe<ResolversTypes['CustomGraphQlResult']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  resendConfirmationCode?: Resolver<Maybe<ResolversTypes['CustomGraphQlResult']>, ParentType, ContextType, RequireFields<MutationResendConfirmationCodeArgs, 'username'>>;
  signup?: Resolver<Maybe<ResolversTypes['SignupResult']>, ParentType, ContextType, RequireFields<MutationSignupArgs, 'email' | 'password'>>;
  userGroups?: Resolver<Maybe<ResolversTypes['CognitoGroupsUnion']>, ParentType, ContextType, RequireFields<MutationUserGroupsArgs, 'username'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  cognitoGroups?: Resolver<Maybe<ResolversTypes['CognitoGroupsUnion']>, ParentType, ContextType>;
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type SignupResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignupResult'] = ResolversParentTypes['SignupResult']> = {
  __resolveType: TypeResolveFn<'CustomError' | 'User', ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isConfirmed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CognitoGroup?: CognitoGroupResolvers<ContextType>;
  CognitoGroupsResult?: CognitoGroupsResultResolvers<ContextType>;
  CognitoGroupsUnion?: CognitoGroupsUnionResolvers<ContextType>;
  CustomError?: CustomErrorResolvers<ContextType>;
  CustomGraphQlResult?: CustomGraphQlResultResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Error?: ErrorResolvers<ContextType>;
  GenericResult?: GenericResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignupResult?: SignupResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello?: string | null };

export type CognitoGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type CognitoGroupsQuery = { __typename?: 'Query', cognitoGroups?: { __typename?: 'CognitoGroupsResult', groups?: Array<{ __typename?: 'CognitoGroup', name: string, description?: string | null } | null> | null } | { __typename?: 'CustomError', error?: { __typename?: 'Error', message: string } | null } | null };

type CustomGraphQlResult_CustomError_Fragment = { __typename?: 'CustomError', error?: { __typename?: 'Error', message: string } | null };

type CustomGraphQlResult_GenericResult_Fragment = { __typename?: 'GenericResult', result?: string | null };

export type CustomGraphQlResultFragment = CustomGraphQlResult_CustomError_Fragment | CustomGraphQlResult_GenericResult_Fragment;

export type SignupMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: { __typename?: 'CustomError', error?: { __typename?: 'Error', message: string } | null } | { __typename?: 'User', id: string, email: string, username?: string | null, isConfirmed?: boolean | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'CustomError', error?: { __typename?: 'Error', message: string } | null } | { __typename?: 'GenericResult', result?: string | null } | null };

export type ConfirmSignupMutationVariables = Exact<{
  username: Scalars['String']['input'];
  code: Scalars['String']['input'];
}>;


export type ConfirmSignupMutation = { __typename?: 'Mutation', confirmSignup?: { __typename?: 'CustomError', error?: { __typename?: 'Error', message: string } | null } | { __typename?: 'GenericResult', result?: string | null } | null };

export type ResendConfirmationCodeMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type ResendConfirmationCodeMutation = { __typename?: 'Mutation', resendConfirmationCode?: { __typename?: 'CustomError', error?: { __typename?: 'Error', message: string } | null } | { __typename?: 'GenericResult', result?: string | null } | null };

export type UserGroupsMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UserGroupsMutation = { __typename?: 'Mutation', userGroups?: { __typename?: 'CognitoGroupsResult', groups?: Array<{ __typename?: 'CognitoGroup', name: string, description?: string | null } | null> | null } | { __typename?: 'CustomError', error?: { __typename?: 'Error', message: string } | null } | null };

export type AddUserToGroupMutationVariables = Exact<{
  username: Scalars['String']['input'];
  groupName: Scalars['String']['input'];
}>;


export type AddUserToGroupMutation = { __typename?: 'Mutation', addUserToGroup?: { __typename?: 'CustomError', error?: { __typename?: 'Error', message: string } | null } | { __typename?: 'GenericResult', result?: string | null } | null };
