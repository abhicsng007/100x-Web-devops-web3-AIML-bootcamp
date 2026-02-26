function checkPermission(roles,checkRole,action) {
   return roles[checkRole]?.includes(action) ?? false ;
}

console.log(checkPermission(roles={ admin:["read","write"], user:["read"], staff: ["write"]},
checkRole="admin",
action="write"));