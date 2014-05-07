// DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER
//  
// Copyright (C) 2014, Cable Television Laboratories, Inc. & Skynav, Inc. 
//  
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// * Redistributions of source code must retain the above copyright notice, this list
//   of conditions and the following disclaimer.
// * Redistributions in binary form must reproduce the above copyright notice, this list
//   of conditions and the following disclaimer in the documentation and/or other
//   materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
// TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
// PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
// THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

"use strict";
(function() {
    var global = window;
    function hasExtAttr(idl, attr) {
        var eas = idl.extAttrs || [];
        for (var i in eas) {
            var ea = eas[i];
            if (ea.name === attr)
                return true;
        }
        return false;
    }
    function level1(spec, idl, getInstance) {
        var idlType = idl.type || 'definition';
        var idlName = idl.name || 'missing';
        var idlDefinedName = spec + '-' + idlType + '-' + idlName.toLowerCase();;
        test(function() {
            assert_true(!!idl, 'Is IDL defined?');
        }, idlDefinedName + '-idl-defined');
        if (!idl)
            return;
        if (!hasExtAttr(idl, 'NoInterfaceObject')) {
            test(function() {
                assert_true(!!global[idlName], 'Is ' + idlName + ' bound at global scope?');
            }, idlDefinedName + '-bound');
        }
        if (!!getInstance) {
            var instance;
            test(function() {
                instance = getInstance();
                assert_true(!!instance, 'Is ' + idlName + ' instance present?');
            }, idlDefinedName + '-instance');
            if (!!instance) {
                for (var i in idl.members) {
                    var member = idl.members[i];
                    var memberName = member.name;
                    if (member.type == 'attribute') {
                        test(function() {
                                assert_true(instance[memberName] !== undefined, 'Does ' + idlName + ' instance have ' + memberName + ' attribute?');
                            }, idlDefinedName + '-instance-has-' + memberName + '-attribute');
                    } else if (member.type == 'operation') {
                        test(function() {
                                assert_true(instance[memberName] !== undefined, 'Does ' + idlName + ' instance have ' + memberName + ' operation?');
                            }, idlDefinedName + '-instance-has-' + memberName + '-operation');
                    }
                }
            }
        }
    };
    global['level1'] = level1;
})();